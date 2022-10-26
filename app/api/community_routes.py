from flask import Blueprint, request
from ..models import db, Community
from ..forms import CommunityForm, EditCommunityForm

community_routes = Blueprint('communities', __name__, url_prefix='/api/communities')

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# get all communities
@community_routes.route('/')
def index():
    all_communities = Community.query.all()
    return {'communities': {community.to_dict() for community in all_communities}}

# get community by id
@community_routes.route('/<int:id>')
def single_community(id):
    community = Community.query.get(id)
    return community.to_dict()

# create a community
@community_routes.route('/new', methods=["POST"])
def create_community():
    form = CommunityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        community = Community(
            name = form.data['name'],
            description = form.data['description'],
            owner_id = form.data['owner_id']
        )
        db.session.add(community)
        db.session.commit()
        return {'community': community.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}

# edit a community
@community_routes.route('/<int:id>/edit', methods=['PUT'])
def edit_community(id):
    form = EditCommunityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        community = Community.query.get(id)
        community.description = form.data['description']
        db.session.add(community)
        db.session.commit()
        return community.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}

# delete a community
@community_routes.route('/<int:id>/delete', methods=['DELETE'])
def delete_community(id):
    community = Community.query.get(id)
    if (community):
        db.session.delete(community)
        db.session.commit()
        return {'message': 'Community has been removed'}
    return {'message': 'This community does not exist'}
