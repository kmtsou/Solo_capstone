from flask import Blueprint
from ..models import db, Vote
from ..forms import VoteForm
from flask_login import current_user, login_required

vote_routes = Blueprint('votes', __name__, url_prefix='/api/votes')

# post votes

@vote_routes.route('/')
def get_votes():
    json = request.get_json()
    if json.isComment:
        votes = Vote.query.filter(json.postId == Vote.comment_id).all()
        return {'votes': votes, 'comment_id': json.postId}
    else:
        votes = Vote.query.filter(json.postId == Vote.post_id).all()
        return {'votes': votes, 'post_id': json.postId}

@vote_routes.route('/comment', methods=['POST'])
@login_required
def create_comment_vote():
    json = request.get_json()
    if json.isUpVote:
        vote = Vote(user_id=current_user.id, comment_id=json.commentId, vote=1)
        db.session.add(vote)
        db.session.commit()
        return vote.to_dict_comment()
    else:
        vote = Vote(user_id=current_user.id, comment_id=json.commentId, vote=-1)
        db.session.add(vote)
        db.session.commit()
        return vote.to_dict_comment()

@vote_routes.route('/post', methods=['POST'])
@login_required
def create_post_vote():
    json = request.get_json()
    if json.isUpVote:
        vote = Vote(user_id=current_user.id, post_id=json.postId, vote=1)
        db.session.add(vote)
        db.session.commit()
        return vote.to_dict_post()
    else:
        vote = Vote(user_id=current_user.id, post_id=json.postId, vote=-1)
        db.session.add(vote)
        db.session.commit()
        return vote.to_dict_post()

@vote_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_vote(id):
    json = request.get_json()
    vote = Vote.query.get(id)
    if json.isUpVote:
        vote.vote = -1
        db.session.add(vote)
        db.session.commit()
        return {'edit': 'success'}
    else:
        vote.vote = 1
        db.session.add(vote)
        db.session.commit()
        return {'edit': 'success'}

# @vote_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def edit_vote(postId, isComment, isUpVote):
#     json = request.get_json()
#     if json.isComment:
#         vote = Vote.query.filter((postId == Vote.comment_id), (Vote.user_id == current_user.id)).first()
#         if json.isUpVote:
#             vote.vote = -1
#             db.session.add(vote)
#             db.session.commit()
#             return {'edit': 'success'}
#         else:
#             vote.vote = 1
#             db.session.add(vote)
#             db.session.commit()
#             return {'edit': 'success'}
#     else:
#         vote = Vote.query.filter((postId == Vote.post_id), (Vote.user_id == current_user.id)).first()
#         if json.isUpVote:
#             vote.vote = -1
#             db.session.add(vote)
#             db.session.commit()
#             return {'edit': 'success'}
#         else:
#             vote.vote = 1
#             db.session.add(vote)
#             db.session.commit()
#             return {'edit': 'success'}
#     return {'edit': 'Cannot find vote'}

# @vote_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def delete_vote(postId, isComment):
#     json = request.get_json()
#     if json.isComment:
#         vote = Vote.query.filter((postId == Vote.comment_id), (Vote.user_id == current_user.id)).first()
#         db.session.delete(vote)
#         db.session.commit()
#         return {'delete': 'success'}
#     else:
#         vote = Vote.query.filter((postId == Vote.post_id), (Vote.user_id == current_user.id)).first()
#         db.session.delete(vote)
#         db.session.commit()
#         return {'delete': 'success'}
#     return {'delete': 'Cannot find vote'}

@vote_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_vote(id):
    vote = Vote.query.get(id)
    if vote:
        db.session.delete(vote)
        db.session.commit()
        return {'message': 'Vote has been deleted'}
    return {'message': 'Vote could not be found'}


# comment votes
