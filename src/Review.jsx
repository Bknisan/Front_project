import React, {Component} from "react";
import './index.css'

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
            <img style={{width: '40px', height: '40px'}} src={review.profile_photo_url} alt={this.name}/>
            <label><b>{review.author_name}</b></label>
            {stars}{half_star}<label style={{color: 'grey'}}>{'| ' + review.relative_time_description}</label>
            <div style={{marginLeft: '10px', MarginRight: '20px'}}>{review.text}</div>
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
            {reviews_list}
        </div>
    }
}