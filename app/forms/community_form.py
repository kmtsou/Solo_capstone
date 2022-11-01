from typing import Text
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired

class CommunityForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    # owner_id = IntegerField('owner_id', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])

class EditCommunityForm(FlaskForm):
    description = TextAreaField('description', validators=[DataRequired()])
