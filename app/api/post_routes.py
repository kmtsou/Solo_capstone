from flask import Blueprint, request
from ..models import db, Post, Comment
from ..forms import PostForm, CommentForm
from flask_login import current_user

post_routes = Blueprint('posts', __name__, url_prefix='/api/posts')

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages

# get all posts
@post_routes.route('/')
def all_posts():
    allPosts = Post.query.all()
    return {'posts': [post.to_dict_rel() for post in allPosts]}

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
        db.session.add(post)
        db.session.commit()
        return post.to_dict_rel()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# delete a post
@post_routes.route('/<int:id>', methods=["DELETE"])
def delete_post(id):
    post = Post.query.get(id)
    if (post):
        db.session.delete(post)
        db.session.commit()
        return {'message': 'Post has been deleted'}
    return {'message': 'This post does not exist'}

# get post comments
@post_routes.route('/<int:postId>/comments')
def get_comments(postId):
    postComments = Comment.query.filter((postId == Comment.post_id),(Comment.parent_id == None)).all()
    return {'comments': [comment.to_dict_rel() for comment in postComments]}

# create new root comment
@post_routes.route('/<int:postId>/comments', methods=['POST'])
def create_comment(postId):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            content = form.data['content'],
            post_id = postId,
            commenter_id = current_user.id
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict_rel()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
