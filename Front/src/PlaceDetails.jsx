import React, {Component} from "react";
import myData from './details.json';
import tst from './tst.jpg'
import './index.css'
import {Review} from "./Review";

export class PlaceDetails extends Component {
    place_id;
    name;
    addr;
    phone;
    photo;
    hours;
    reviews;
    reviews_len;
    rating;
    website;

    constructor(props) {
        super(props);
        this.place_id = props.place_id;
        this.state = {
            list: false,
            icons: ['arrow_drop_down', 'arrow_drop_up'],
            idx: 0
        };
        this.labelClick = this.labelClick.bind(this);
    }

    getDetails() {
        // TODO : ask server for information
        const result = myData.result;
        this.name = result.name;
        this.addr = result.formatted_address;
        this.phone = result.international_phone_number;
        //this.photo = TODO
        this.hours = result.opening_hours.weekday_text;
        this.reviews = result.reviews;
        this.reviews_len = result.user_ratings_total;
        this.rating = result.rating;
        this.website = result.website
    }

    // called before render
    componentWillMount() {
        this.getDetails()
    }

    labelClick() {
        this.setState({list: !this.state.list, idx: (this.state.idx + 1) % 2})
    }

    render() {
        let stars = [];
        let half_star = [];
        let rates = ' (' + this.reviews_len + ')';
        for (let i = 0; i < parseInt(this.rating); i++) {
            stars.push(<i className="material-icons" style={{color: '#FFD700'}}>{'star'}</i>)
        }
        if (parseFloat(this.rating) % 1 > 0) {
            half_star.push(<i className="material-icons" style={{color: '#FFD700'}}>{'star_half'}</i>)
        }
        let phone_element = [];
        if (this.phone !== undefined) {
            phone_element.push(<i className="material-icons icon_margin"
                                  style={{color: '#32CD32'}}>{'local_phone'}</i>);
            phone_element.push(this.phone)
        }

        let web_element = [];
        if (this.phone !== undefined) {
            web_element.push(<i className="material-icons icon_margin" style={{color: '#32CD32'}}>{'language'}</i>);
            let site_name = this.website.substr(8, this.website.length);
            site_name = site_name.substr(0, site_name.indexOf('/'));
            web_element.push(<a href={this.website}>{site_name}</a>)
        }

        let opening = [];
        if (this.hours !== undefined) {
            opening.push(<i className="material-icons icon_margin" style={{color: '#32CD32'}}>{'access_time'}</i>);
            opening.push(<label onClick={this.labelClick}>
                <b>Opening Hours</b>
                <i className="material-icons icon_margin">{this.state.icons[this.state.idx]}</i>
            </label>);
            opening.push(this.state.list && openingHours(this.hours))
        }


        return <div style={{
            marginLeft: '20%',
            maxHeight: '100%',
            overflowY: 'auto',
            width: '20%',
            position: 'absolute',
            background: 'white',
            overflowX: 'hidden'
        }} className='noselect'>
            <img src={tst} alt={this.name}/>
            <p>
                <strong style={{fontSize: '25px'}}>{this.name}</strong>
                <br/>
                {this.rating + ' '}{stars}{half_star}{rates}
            </p>
            <hr/>
            <div>
                <i className="material-icons icon_margin" style={{color: '#32CD32'}}>{'room'}</i> {this.addr}
                <br/>
                {phone_element}
                <br/>
                {web_element}
                <br/>
                {opening}
                <br/>
                <hr/>
                <Review reviews={this.reviews}/>
            </div>
        </div>
    }
}

function openingHours(hours) {
    let list_items = [];
    for (let i = 0; i < 7; ++i) {
        list_items.push(
            <p style={{marginLeft: '9%', fontSize: '14px'}}>
                <b>{hours[i].split(':')[0]} </b> {hours[i].substr(hours[i].indexOf(": ")).slice(1)}
            </p>
        )
    }
    return list_items
}
