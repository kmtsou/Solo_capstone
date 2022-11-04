from flask import Blueprint, request
from ..models import Comment
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
