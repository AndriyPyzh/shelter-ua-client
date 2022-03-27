import Joi from "joi-browser";
import React from 'react';
import Form from "../shared/form";

class AdvertsFilter extends Form {
    state = {
        data: {
            country: '1',
            region: '0',
            persons: null,
            criterias: [],
            period: null
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
        persons: Joi.any(),
        period: Joi.any(),
        criterias: Joi.any()
    };


    doSubmit = async () => {
        const data = { ...this.state.data };
        let searchParams = {};
        searchParams.country = this.options.countries.find(x => x._id == data.country).name;
        searchParams.region = data.region === '0' ? null : this.options.regions.find(x => x._id == data.region).name;
        searchParams.persons = data.persons;
        if (data.criterias.length !== 0) {
            searchParams.criterias = data.criterias.join(',');
        }
        searchParams.period = data.period;

        this.props.onFilter(searchParams);
    };

    render() {
        return (
            <div className="col-sm-4 p-0" style={ { marginBottom: 100 } }>
                <div className="border rounded m-lg-3" style={ { borderColor: "gray" } }>
                    <form onSubmit={ this.handleSubmit }>
                        <div className="card-body" style={ { padding: 20, paddingBottom: 0 } }>
                            { super.renderSelect("country", "Країна", this.options.countries) }
                            { super.renderSelect("region", "Регіон", this.options.regions) }
                            { super.renderInput("persons", "Кількість людей", "Кількість людей...", 'number', true, { min: 0 }) }
                            { super.renderCheckBox("criterias", "Кого приймають", this.options.criterias) }
                            { super.renderRadio("period", "На який термін", this.options.periods, 'radio') }
                        </div>
                        <div className="row justify-content-md-center pb-4" style={ { width: 305, marginLeft: 20 } }>
                            { super.renderButton("Пошук", "btn btn-primary btn-block") }
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

export default AdvertsFilter;
