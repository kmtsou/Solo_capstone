from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class CommunityForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    # owner_id = IntegerField('owner_id', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])

class EditCommunityForm(FlaskForm):
    description = StringField('description', validators=[DataRequired()])
