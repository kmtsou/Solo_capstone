from flask import Blueprint
from ..models import db, Vote
from flask_login import current_user, login_required

vote_routes = Blueprint('votes', __name__, url_prefix='/api/votes')

# post votes

@vote_routes.route('/<int:id>')
def get_votes(postId, isComment):
    if isComment:
        votes = Vote.query.filter(postId == Vote.comment_id).all()
        return {'votes': votes, 'comment_id': postId}
    else:
        votes = Vote.query.filter(postId == Vote.post_id).all()
        return {'votes': votes, 'post_id': postId}

@vote_routes.route('/<int:id>', methods=['POST'])
@login_required
def create_vote(postId, isComment, isUpVote):
    if isComment:
        if isUpVote:
            vote = Vote(user_id=current_user.id, comment_id=postId, vote=1)
        else:
            vote = Vote(user_id=current_user.id, comment_id=postId, vote=-1)
    else:
        if isUpVote:
            vote = Vote(user_id=current_user.id, post_id=postId, vote=1)
        else:
            vote = Vote(user_id=current_user.id, post_id=postId, vote=-1)
    return {'vote': postId}

@vote_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_vote(postId, isComment, isUpVote):
    if isComment:
        vote = Vote.query.filter((postId == Vote.comment_id), (Vote.user_id == current_user.id)).first()
        if isUpVote:
            vote.vote = -1
            db.session.add(vote)
            db.session.commit()
            return {'edit': 'success'}
        else:
            vote.vote = 1
            db.session.add(vote)
            db.session.commit()
            return {'edit': 'success'}
    else:
        vote = Vote.query.filter((postId == Vote.post_id), (Vote.user_id == current_user.id)).first()
        if isUpVote:
            vote.vote = -1
            db.session.add(vote)
            db.session.commit()
            return {'edit': 'success'}
        else:
            vote.vote = 1
            db.session.add(vote)
            db.session.commit()
            return {'edit': 'success'}
    return {'edit': 'Cannot find vote'}

@vote_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_vote(postId, isComment):
    if isComment:
        vote = Vote.query.filter((postId == Vote.comment_id), (Vote.user_id == current_user.id)).first()
        db.session.delete(vote)
        db.session.commit()
        return {'delete': 'success'}
    else:
        vote = Vote.query.filter((postId == Vote.post_id), (Vote.user_id == current_user.id)).first()
        db.session.delete(vote)
        db.session.commit()
        return {'delete': 'success'}
    return {'delete': 'Cannot find vote'}

# comment votes
