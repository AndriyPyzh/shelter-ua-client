import React, { Component } from 'react';
import { toast } from "react-toastify";
import advertService from "../../services/advertService";
import logger from "../../services/logService";
import Advert from "./advert";
import AdvertsFilter from "./advertsFilter";

class Adverts extends Component {
    state = {
        adverts: [],
        pageable: {
            page: 0,
            size: 5
        },
        searchParams: {},
        showButton: true
    };

    initAdverts = async (searchParams) => {
        try {
            let showButton = true;
            let page = 0;
            const { size } = this.state.pageable;
            const { data } = await advertService.getAdverts(searchParams, page, size);
            if (data.content.length === 0 || data.content.length < size) {
                showButton = false;
            }
            const adverts = data.content;
            this.setState({ showButton, adverts, searchParams, pageable: { page, size } });
        } catch (ex) {
            logger.log(ex);
            if (ex.response)
                toast.error(ex.response.data.toString());
            else
                toast.error(ex.toString());
        }
    };

    loadMore = async () => {
        try {
            let showButton = true;
            let adverts = this.state.adverts;
            let { page, size } = this.state.pageable;
            page = page + 1;
            const { data } = await advertService.getAdverts(this.state.searchParams, page, size);
            if (data.content.length === 0 || data.content.length < size) {
                showButton = false;
            }
            adverts = adverts.concat(data.content);
            this.setState({ showButton, adverts, pageable: { page: page, size } });
        } catch (ex) {
            logger.log(ex);
            if (ex.response)
                toast.error(ex.response.data.toString());
            else
                toast.error(ex.toString());
        }
    };

    async componentWillMount() {
        await this.initAdverts({ country: 'Україна' });
    }

    onFilter = (searchParams) => {
        this.initAdverts(searchParams);
    };

    render() {
        return (
            <div>
                <div className="text-center mt-5" style={ { fontSize: 50, height: 100 } }>Знайти безкоштовне житло</div>
                <div className="row" style={ { marginTop: 10 } }>
                    <AdvertsFilter onFilter={ this.onFilter }/>
                    <div className="col-sm-8 p-0">
                        { this.state.adverts.length === 0 ?
                            <div className="d-flex align-items-center justify-content-center" style={ { height: 300 } }>
                                <div className="text-secondary" style={ { fontSize: 30 } }>Нічого не знайдено</div>
                            </div> :
                            <React.Fragment>
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
                                                dateCreated={ advert.dateCreated }
                                        />)
                                    }
                                </div>
                                <div className="d-flex justify-content-center mt-5 mb-lg-5">
                                    { this.state.showButton &&
                                    <button type="button" className="btn btn-primary" onClick={ this.loadMore }>
                                        Знайти ще
                                    </button>
                                    }
                                </div>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Adverts;
