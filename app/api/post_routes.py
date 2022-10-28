from flask import Blueprint, request
from ..models import db, Post
from ..forms import PostForm
from flask_login import current_user

post_routes = Blueprint('posts', __name__, url_prefix='/api/posts')

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# get all posts
@post_routes.route('/')
def all_posts():
    allPosts = Post.query.all()
    return {'posts': [post.to_dict() for post in allPosts]}

# get post by id
@post_routes.route('/<int:id>')
def get_post_by_id(id):
    post = Post.query.get(id)
    return post.to_dict_rel()

# edit a post
@post_routes.route('/<int:id>', methods=['PUT'])
def edit_post(id):
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post.query.get(id)
        post.title = form.data['title']
        post.content = form.data['content']
        post.imageContent = form.data['imageContent']
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}

# delete a post
@post_routes.route('/<int:id>', methods=["DELETE"])
def delete_post(id):
    post = Post.query.get(id)
    if (post):
        db.session.delete(post)
        db.session.commit()
        return {'message': 'Post has been deleted'}
    return {'message': 'This post does not exist'}
