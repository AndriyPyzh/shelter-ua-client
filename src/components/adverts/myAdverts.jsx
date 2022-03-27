import React, { Component } from 'react';
import { toast } from "react-toastify";
import advertService from "../../services/advertService";
import logger from "../../services/logService";
import Advert from "./advert";

class MyAdverts extends Component {
    state = {
        adverts: []
    };

    async componentWillMount() {
        try {
            const { data: adverts } = await advertService.getByAuthor();
            this.setState({ adverts });
        } catch (ex) {
            logger.log(ex);
            if (ex.response)
                toast.error(ex.response.data.toString());
            else
                toast.error(ex.toString());
        }
    }

    render() {
        return (
            <div>
                <div className="text-center mt-5" style={ { fontSize: 50, height: 100 } }>Мої Оголошення</div>
                <div className="row" style={ { marginTop: 10, marginLeft: 270 } }>
                    <div className="col-sm-8 p-0">
                        { this.state.adverts.length === 0 ?
                            <div className="d-flex align-items-center justify-content-center" style={ { height: 500 } }>
                                <div className="text-secondary" style={ { fontSize: 30 } }>Ви поки не додали жодного
                                    оголошення
                                </div>
                            </div> :
                            <div className=" m-lg-3" style={ { borderColor: "gray" } }>
                                { this.state.adverts.map(advert =>
                                    <Advert id={ advert.id }
                                            city={ advert.city }
                                            region={ advert.region }
                                            phoneNumber={ advert.phoneNumber }
                                            street={ advert.street }
                                            persons={ advert.persons }
                                            criterias={ advert.criterias }
                                            period={ advert.period }
                                            description={ advert.description }
                                            dateCreated= { advert.dateCreated }
                                    />)
                                }
                                <div style={ { height: 200 } }/>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default MyAdverts;
