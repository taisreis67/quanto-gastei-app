import React, { Component } from 'react';
import classNames from 'classnames';
import validator from 'validator';
import ls from 'local-storage';

class Register extends Component {
    constructor(props) {
        super(props);
        
        const requestAPI = {
            responseTransaction: '',
            classResponse: '',
            fieldDisable: false,
        };

        const transactionValue = {
            id: 1,
            fieldType: 'text',
            label: 'Valor da transação',
            name: 'transaction-value',
            value: '',
            isValid: true,
            message: '',
            requered: true,
        };

        const transactionDescription = {
            id: 2,
            fieldType: 'text',
            label: 'Adicione uma descrição',
            name: 'transaction-description',
            value: '',
            isValid: true,
            message: '',
            requered: true,
        };

        const transactionType = {
            id: 3,
            fieldType: 'select',
            label: 'Qual o tipo da transação?',
            name: 'transaction-type',
            value: '',
            isValid: true,
            message: '',
            requered: true,
            options: [
                {
                    label: 'Débito',
                    value: '1',
                },
                {
                    label: 'Crédito',
                    value: '2',
                },
            ],
        };

        const formItens = [
            transactionValue,
            transactionDescription,
            transactionType,
        ];

        this.state = {
            formItens,
            ...requestAPI,
        };
    }

    text = (item) => {
        const {
            fieldDisable,
        } = this.state;

        const classNameElement = classNames('form-group',
            { 'has-error': !item.isValid });

        return (
            <div className="content-form" key={item.id}>
                <div className={`form-group ${classNameElement}`}>
                    <label htmlFor={item.name}>
                        {item.question}
                        {
                            (item.required) ?
                            <span className="text-danger"> *</span> :
                            ''
                        }
                    </label>

                    <input
                        type="text"
                        name={item.name}
                        className={`form-control ${(item.message !== '')
                            ? 'is-invalid' : ''}`}
                        value={item.value}
                        onChange={this.onChange}
                        disabled={fieldDisable}
                    />

                    <div className="invalid-field-text">{item.message}</div>
                </div>
            </div>
        );
    }

    selectOptions = (({options}) => {
		return options.map((option, index) => {
			return <option key={index} value={option.value}>{option.label}</option>;
		});
	});

    select = (item) => {
		const {
			fieldDisable,
        } = this.state;

		const classNameElement = classNames('form-group',
			{ 'has-error': !item.isValid });

		return (
			<div className="content-form" key={item.id}>
				<div className={`form-group ${classNameElement}`}>
					<label htmlFor={item.name}>
						{item.label}
						{
							(item.required) ?
							<span className="text-danger"> *</span> :
							''
						}
					</label>

					<select 
						className={`form-control ${(item.message !== '')
						? 'is-invalid' : ''}`}
						name={item.name}
						onChange={this.onChange}
						disabled={fieldDisable}
					>
						<option value="">Selecione</option>
						{this.selectOptions(item)}
					</select>

					<div className="invalid-field-text">{item.message}</div>
				</div>
			</div>
		);
	}

    formCriation = () => {
        const {
            formItens
        } = this.state;

        return formItens.map(item => this[item.fieldType](item));
    }

    transactionSave = () => {
        const {
            formItens
        } = this.state;

        this.setState({
            responseTransaction: '',
            fieldDisable: true,
        });

        try {
            ls.set('transactions', formItens);

            this.setState({
                responseTransaction: 'Transação salva com sucesso.',
                classResponse: 'success',
            });            
        } catch (error) {
            this.setState({
                responseTransaction: 'Erro ao enviar os dados.',
                classResponse: 'danger',
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

        this.props.history.push('/list');       
    };

    render() {
        const {
            fieldDisable,
            responseTransaction,
            classResponse,
        } = this.state;

        return (
            <section>
                <header className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h2 className="display-4">Transações</h2>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <form className="form-register">
                                {this.formCriation()}

                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    disabled={fieldDisable}
                                    onClick={this.onSubmit}
                                >
                                    {fieldDisable ? 'cadastrando...' : 'cadastrar'}
                                </button>
                            </form>

                            { classResponse !== ''
                            ? (
                                <div
                                    className={`response-create-account mt-3 alert alert-${classResponse}`}
                                >
                                    {responseTransaction}
                                </div>
                            )
                            : ''}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default Register;