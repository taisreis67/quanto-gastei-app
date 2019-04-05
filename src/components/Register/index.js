import React, { Component } from 'react';
import classNames from 'classnames';
import validator from 'validator';
import ls from 'local-storage';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import Message from '../Message';

class Register extends Component {
    constructor(props) {
        super(props);

        const transactionValue = {
            id: 1,
            question: 'Qual o valor da transação?',
            fieldType: 'text',
            label: 'Valor da transação',
            name: 'transaction-value',
            value: '',
            isValid: true,
            message: '',
            required: true,
        };

        const transactionDescription = {
            id: 2,
            question: 'Adicione uma descrição',
            fieldType: 'text',
            label: 'Adicione uma descrição',
            name: 'transaction-description',
            value: '',
            isValid: true,
            message: '',
            required: true,
        };

        const formItens = [
            transactionValue,
            transactionDescription,
        ];

        this.state = {
            formItens,
            textMessage: '',
            classMessage: '',
            fieldDisable: false,
        };
    }

    transactionSave = () => {
        const {
            formItens
        } = this.state;

        const data = formItens.map((item) => item.value);

        this.setState({
            message: '',
            fieldDisable: true,
        });

        try {
            let transactions = ls.get('transactions') || [];
            transactions.push(data);
            ls.set('transactions', transactions);

            this.props.history.push({
                pathname: '/list',
                state: { 
                    textMessage: 'Transação cadastrada com sucesso.',
                    classMessage: 'success',
                }
            });
        } catch (error) {
            this.setState({
                message: 'Erro ao enviar os dados.',
                classMessage: 'danger',
            });
        }

        this.setState({
            fieldDisable: false,
        });
    };

    formIsValid = () => {
        let isGood = true;

        const formItens = this.state.formItens.map((field) => {
            if (validator.isEmpty(field.value)) {
                field.isValid = false;
                field.message = `* O campo ${field.label} não pode ser vazio.`;
                isGood = false;

                return field;
            }

            field.isValid = true;
            field.message = '';

            return field;
        });

        if (!isGood) {
            this.setState({ formItens });
        }

        return isGood;
    };

    onChange = (e) => {
        const itens = this.state.formItens;
        const index = itens.findIndex(item => item.name === e.target.name);
        let value = e.target.value;

        const state = {
            formItens: [
                itens[index] = {
                    ...itens[index],
                    value,
                },
                ...itens,
            ],
            ...this.state,
        };

        this.setState(state);
    };

    onSubmit = (e) => {
        e.preventDefault();

        this.formIsValid();

        if (this.formIsValid()) {
            this.transactionSave();
        }
    };

    message = () => {
        const {
            textMessage,
            classMessage,
        } = this.state;

        return <Message textMessage={textMessage} classMessage={classMessage} />;
    }

    render() {
        const {
            fieldDisable,
            classResponse,
            formItens
        } = this.state;

        const classNameValue = classNames('form-group', { 'has-error': !formItens[0].isValid });
        const classNameDescription = classNames('form-group', { 'has-error': !formItens[1].isValid });

        const numberMask = createNumberMask({
            prefix: 'R$ ',
            thousandsSeparatorSymbol: '.',
            allowDecimal: true,
            decimalSymbol: ',',
        });

        return (
            <section className="container">
                <div className="card">
                    <div className="card-body">
                        <form className="form-register">
                            <div className="content-form">
                                <div className={`form-group ${classNameValue}`}>
                                    <label htmlFor={formItens[1].name}>
                                        {formItens[0].question}
                                        {(formItens[0].required) ? <span> *</span> : ''}
                                    </label>

                                    <MaskedInput
                                        mask={numberMask}
                                        className={`form-control ${(formItens[0].message !== '') ? 'is-invalid' : ''}`}
                                        name={formItens[0].name}
                                        value={formItens[0].value}
                                        onChange={this.onChange}
                                        disabled={fieldDisable}
                                        guide={false}
                                    />

                                    <div className="invalid-field-text">{formItens[0].message}</div>
                                </div>
                            </div>

                            <div className="content-form">
                                <div className={`form-group ${classNameDescription}`}>
                                    <label htmlFor={formItens[1].name}>
                                        {formItens[1].question}
                                        {(formItens[1].required) ? <span> *</span> : ''}
                                    </label>

                                    <input
                                        type="text"
                                        className={`form-control ${(formItens[1].message !== '') ? 'is-invalid' : ''}`}
                                        name={formItens[1].name}
                                        value={formItens[1].value}
                                        onChange={this.onChange}
                                        disabled={fieldDisable}
                                    />

                                    <div className="invalid-field-text">{formItens[1].message}</div>
                                </div>
                            </div>

                            <button className="btn btn-block btn-primary" type="button" disabled={fieldDisable} onClick={this.onSubmit} >
                                {fieldDisable ? 'adicionando...' : 'adicionar'}
                            </button>
                        </form>

                        {classResponse === 'danger' ? this.message() : ''}
                    </div>
                </div>
            </section>
        );
    }
}
export default Register;