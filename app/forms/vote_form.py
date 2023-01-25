from flask_wtf import FlaskForm
from wtforms import BooleanField
from wtforms.validators import DataRequired

class VoteForm(FlaskForm):
    isComment = BooleanField('isComment')
    isUpvote = BooleanField('isUpvote')
