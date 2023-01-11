from flask import Blueprint
from ..models import db, Vote
from flask_login import current_user, login_required

vote_routes = Blueprint('votes', __name__, url_prefix='/api/votes')

@vote_routes.route('/<int:id>', methods=['POST'])
@login_required
def create_vote():
    return {}
