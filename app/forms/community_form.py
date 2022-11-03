from typing import Text
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from ..models import Community

def community_name_exists(form, field):
    community_name = field.data
    community = Community.query.filter(Community.name == community_name).first()
    if (community):
        raise ValidationError('Community with this name already exists')

class CommunityForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), community_name_exists])
    # owner_id = IntegerField('owner_id', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])

class EditCommunityForm(FlaskForm):
    description = TextAreaField('description', validators=[DataRequired()])
