import moment from "moment";
import "moment/locale/uk";
import React from 'react';

const Advert = ({ id, city, region, phoneNumber, street, persons, criterias, period, description, dateCreated }) => {

    return (
        <div className="border rounded mb-4">
            <div className="pt-3 pl-3 font-weight-bolder" style={ { fontSize: 20 } }>{ city }, { region }</div>
            <div className="pl-3 text-secondary" style={ { fontSize: 17, fontWeight: 500 } }>{ street }</div>
            <div className="col mt-2">
                <span className="pl-2 pr-2 bg-danger text-white font-weight-bold"
                      style={ { fontSize: 12, borderRadius: 100, paddingTop: 2, paddingBottom: 2 } }>{ period }</span>
                { criterias.map(criteria => (
                    <span className="ml-2 pl-2 pr-2 bg-primary text-white font-weight-bold"
                          style={ {
                              fontSize: 12,
                              borderRadius: 100,
                              paddingTop: 2,
                              paddingBottom: 2
                          } }>{ criteria }</span>
                )) }
            </div>
            <div className="pt-2 pl-3 font-weight-bolder" style={ { fontSize: 17 } }>Місць: { persons }</div>
            <div className="pt-2 pl-3" style={ { fontSize: 17, fontWeight: 400 } }>{ description }</div>
            <div className="pl-3 pt-2 pb-2 text-secondary" style={ { fontSize: 14, fontWeight: 500 } }>
                Стоворено: { moment(dateCreated).format('DD MMM YYYY') }
            </div>
            <div className="pb-3 pl-3">
                <button type="button" className="btn btn-success">
                    { phoneNumber }
                </button>
            </div>
        </div>
    );
};

export default Advert;
