from flask import Blueprint
from ..models import Community
from ..forms import CommunityForm

community_routes = Blueprint('communities', __name__, url_prefix='/api/communities')

@community_routes.route('/')
def index():
    all_communities = Community.query.all()
    return {'communities': {community.to_dict() for community in all_communities}}
