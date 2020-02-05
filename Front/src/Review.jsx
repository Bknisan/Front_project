import React, {Component} from "react";
import ReactTextCollapse from 'react-text-collapse'
import './index.css'
const TEXT_COLLAPSE_OPTIONS = {
    collapse: false, // default state when component rendered
    collapseText: '... show more', // text to show when collapsed
    expandText: 'show less', // text to show when expanded
    minHeight: 100, // component height when closed
    maxHeight: 200, // expanded to
    textStyle: { // pass the css for the collapseText and expandText here
        fontSize: "14px"
    }
};
export class Review extends Component {

    createReviewCard(review) {
        let stars = [];
        let half_star = [];
        for (let i = 0; i < parseInt(review.rating); i++) {
            stars.push(<i className="material-icons" style={{color: '#FFD700'}}>{'star'}</i>)
        }
        if (parseFloat(review.rating) % 1 > 0) {
            half_star.push(<i className="material-icons" style={{color: '#FFD700'}}>{'star_half'}</i>)
        }
        return <div>
            <img style={{width : '40px', height : '40px'}} src={review.profile_photo_url} alt={this.name}/> <label><b>{review.author_name}</b></label>
            <br/>
            {stars}{half_star}<label style={{color: 'grey'}}>{ '| ' + review.relative_time_description}</label>
            <br/>
            <ReactTextCollapse options={TEXT_COLLAPSE_OPTIONS}>{review.text}</ReactTextCollapse>
            <br/>
            <hr/>
        </div>

    }

    render() {
        let reviews = this.props.reviews;
        let reviews_list = [];
        for (let i = 0; i < reviews.length; ++i) {
            reviews_list.push(this.createReviewCard(reviews[i]))
        }
        return <div>
            <p><strong>Reviews:</strong></p>
            <br/>
            {reviews_list}
        </div>
    }
}