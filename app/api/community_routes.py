from flask import Blueprint, request
from ..models import db, Community, Post
from ..forms import CommunityForm, EditCommunityForm, PostForm
from flask_login import current_user, login_required

community_routes = Blueprint('communities', __name__, url_prefix='/api/communities')

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

# get all communities
@community_routes.route('/')
def index():
    all_communities = Community.query.all()
    return {'communities': [community.to_dict() for community in all_communities]}

# get community by id
@community_routes.route('/<int:id>')
def single_community(id):
    community = Community.query.get(id)
    return community.to_dict()

# create a community
@community_routes.route('/', methods=["POST"])
@login_required
def create_community():
    form = CommunityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        community = Community(
            name = form.data['name'],
            description = form.data['description'],
            owner_id = current_user.id
        )
        community.community_follows.append(current_user)
        db.session.add(community)
        db.session.commit()
        return {'community': community.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# edit a community
@community_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_community(id):
    form = EditCommunityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        community = Community.query.get(id)
        community.description = form.data['description']
        db.session.add(community)
        db.session.commit()
        return community.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# delete a community
@community_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_community(id):
    community = Community.query.get(id)
    if (community):
        db.session.delete(community)
        db.session.commit()
        return {'message': 'Community has been removed'}
    return {'message': 'This community does not exist'}

# get community posts
@community_routes.route('/<int:id>/posts')
def community_posts(id):
    communityPosts = Post.query.filter(id == Post.community_id).all()
    return {'posts': [post.to_dict_rel() for post in communityPosts]}

# create a post in community
@community_routes.route('/<int:id>/posts', methods=["POST"])
@login_required
def create_post(id):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post(
            title = form.data['title'],
            content = form.data['content'],
            # imageContent = form.data['imageContent'],
            community_id = id,
            poster_id = current_user.id
        )
        db.session.add(post)
        db.session.commit()
        return post.to_dict_rel()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
