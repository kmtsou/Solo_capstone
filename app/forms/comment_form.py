from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    content = StringField('content', validators=[DataRequired()])
    # post_id = IntegerField('post_id', validators=[DataRequired()])

class ChildCommentForm(FlaskForm):
    content = StringField('content', validators=[DataRequired()])
    post_id = IntegerField('post_id', validators=[DataRequired()])
    # parent_id = IntegerField('parent_id', validators=[DataRequired()])
