import Joi from "joi-browser";
import React from 'react';
import { toast } from "react-toastify";
import advertService from "../../services/advertService";
import Form from "../shared/form";


class AddAdvert extends Form {
    state = {
        data: {
            country: '1',
            region: '0',
            phoneNumber: null,
            city: null,
            street: null,
            persons: 1,
            criterias: [],
            period: null,
            description: null
        },
        errors: {},
        showMessages: {}
    };

    options = {
        countries: [
            {
                _id: 1,
                name: "Україна"
            }, {
                _id: 2,
                name: "США"
            }, {
                _id: 3,
                name: "Польща"
            }, {
                _id: 4,
                name: "Молдова"
            }, {
                _id: 5,
                name: "Словаччина"
            }
        ],
        regions: [
            {
                _id: 0,
                name: "Oберіть район"
            },
            {
                _id: 1,
                name: "Тернопільська"
            }, {
                _id: 2,
                name: "Львівська"
            }
        ],
        periods: [
            {
                _id: 3,
                name: "На будь-який термін"
            }, {
                _id: 4,
                name: "На період війни"
            }, {
                _id: 5,
                name: "На декілька днів"
            }, {
                _id: 6,
                name: "На одну ніч"
            }
        ],
        criterias: [
            {
                _id: 7,
                name: "Будь-кого"
            }, {
                _id: 8,
                name: "Сім’ї з дітьми"
            }, {
                _id: 9,
                name: "Сім’ї без дітей"
            }, {
                _id: 10,
                name: "Жінки"
            }, {
                _id: 11,
                name: "Діти"
            }, {
                _id: 12,
                name: "Люди похилого віку"
            }, {
                _id: 13,
                name: "Чоловіки"
            }, {
                _id: 14,
                name: "Тварини (коти, собаки)"
            }
        ]
    };

    schema = {
        country: Joi.any(),
        region: Joi.any(),
        phoneNumber: Joi.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/).required().label('Phone Number').options({
            language: { string: { regex: { base: 'should be a valid phone number' } } }
        }),
        city: Joi.string().min(2).required().label('Місто'),
        street: Joi.string().min(2).required().label('Вулиця'),
        persons: Joi.any(),
        period: Joi.any(),
        criterias: Joi.any(),
        description: Joi.string().min(10).required().label('Опис')
    };


    doSubmit = async () => {
        const data = { ...this.state.data };
        let newAdvert = {};
        newAdvert.country = this.options.countries.find(x => x._id == data.country).name;
        newAdvert.region = data.region === '0' ? null : this.options.regions.find(x => x._id == data.region).name;
        newAdvert.persons = parseInt(data.persons);
        newAdvert.criterias = data.criterias;
        newAdvert.period = data.period;
        newAdvert.city = data.city;
        newAdvert.street = data.street;
        newAdvert.phoneNumber = data.phoneNumber;
        newAdvert.description = data.description;

        try {
            await advertService.addAdvert(newAdvert);
            this.props.history.push('/my-adverts');
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message.toString());
            } else
                toast.error(ex.message.toString());
        }
    };

    render() {
        return (
            <div className="d-flex justify-content-center" style={ { marginBottom: 100, width: 800 } }>
                <div style={ { marginLeft: 350 } }>
                    <div className="text-center mt-5" style={ { fontSize: 50, height: 100 } }>Розмістити оголошення
                    </div>
                    <div className="border rounded m-lg-3" style={ { borderColor: "gray" } }>
                        <form onSubmit={ this.handleSubmit }>
                            <div className="card-body" style={ { padding: 20, paddingBottom: 0 } }>
                                { super.renderSelect("country", "Країна", this.options.countries) }
                                { super.renderSelect("region", "Регіон", this.options.regions) }
                                { super.renderInput("city", "Місто", "Місто...") }
                                { super.renderInput("street", "Вулиця", "Вулиця...") }
                                { super.renderInput("phoneNumber", "Номер телефону", "Номер телефону...") }
                                { super.renderInput("persons", "Кількість людей", "Кількість людей...", 'number', true, { min: 1 }) }
                                { super.renderCheckBox("criterias", "Кого приймають", this.options.criterias) }
                                { super.renderRadio("period", "На який термін", this.options.periods, 'radio') }
                                { super.renderInput("description", "Деталі", "Деталі...") }
                            </div>
                            <div className="row justify-content-md-center pb-4"
                                 style={ { width: 500, marginLeft: 20, marginRight: 20 } }>
                                { super.renderButton("Пошук", "btn btn-primary btn-block") }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddAdvert;
