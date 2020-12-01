import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import axios from 'axios'
import './../styles/modal.css'
import './../styles/comment.css'

export default function PopUp({showCard, card_info, onClose}) {
    interface comment_interface{
        username: String,
        movieName: String,
        comment: String
    }

    const [comment, setComment] = useState("" as String);
    const [comments, setComments] = useState([] as comment_interface[]);
    /* If user presses add-comment button, then a new comment record is added to db with foreign keys(username and movieName) and the comment*/
    const postComment = () : void => {
        const commentCred = {username: sessionStorage.getItem('username'), movieName: card_info.movieName, comment: comment};
        console.log(commentCred)
        axios.post('http://it2810-56.idi.ntnu.no:3000/comments/add', commentCred)
        .then(()=> retrieveComments())
    }
    /* Used to always keep track of the text written in comment field, updates when text is changed */
    const handleChange = (e : any) : void => {
        setComment(e.target.value)
    }
    /* Does a call to comments schema in DB, adds comments to comments variable showing the newest comments first  */
    const retrieveComments = () : void => {
        fetch('http://it2810-56.idi.ntnu.no:3000/comments/' + card_info.movieName)
        .then((response) => response.json())
        .then((comments_json) =>{
            setComments(comments_json.reverse())
    })};

    return (
        <div>
        <Modal show={showCard} size="lg" centered  >
            <Modal.Header closeButton onClick={() => onClose()}>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className="movieName">
                        {card_info.movieName}
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img id="modal-img" src={require('./../images/card.png')} alt="Avatar" style={{display: "table", margin: "0 auto"}}/>
                <p id="desc">
                {card_info.movieDescription}
                </p>
                <br></br>
                <div className="commentBox">
                    <input type="text" name="comment" id="comment" onChange={handleChange}/>
                    <input type="submit" value="Add comment" onClick={postComment}/>
                    <input type="submit" value="Get comments" onClick={retrieveComments}/>
                </div>
                {comments.map((comment,i) => (
                    <div className="comment-section">
                        <>
                        <h5>{comment.username}</h5>
                        <p>Comment: {comment.comment}</p>
                        </>
                    </div>
                    ))}
            </Modal.Body>
            <Modal.Footer>
                <div id="rating">Movie rating: {card_info.movieRating}</div>
                <Button onClick={() => onClose()}>Close</Button>
            </Modal.Footer>
        </Modal>
        </div>
    )
}