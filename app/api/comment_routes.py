from flask import Blueprint, request
from ..models import db, Comment
from ..forms import CommentForm
from flask_login import current_user

comment_routes = Blueprint('comments', __name__, url_prefix='/api/comments')

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

@comment_routes.route('/<int:id>', methods=['POST'])
def comment_on_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            content = form.data['content'],
            post_id = form.data['post_id'],
            commenter_id = current_user.id,
            parent_id = id
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict_rel()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# edit comment
@comment_routes.route('/<int:id>', methods=['PUT'])
def edit_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment.query.get(id)
        comment.content = form.data['content']
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict_rel()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# delete comment
@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)
    if (comment):
        db.session.delete(comment)
        db.session.commit()
        return {'message': 'Comment has been deleted'}
    return {'message': 'This comment does not exist'}
