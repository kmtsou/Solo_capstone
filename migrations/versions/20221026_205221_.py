"""empty message

Revision ID: 928eedc67f87
Revises: 
Create Date: 2022-10-26 20:52:21.262592

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '928eedc67f87'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('communities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('owner_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('communityFollows',
    sa.Column('users', sa.Integer(), nullable=False),
    sa.Column('communities', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['communities'], ['communities.id'], ),
    sa.ForeignKeyConstraint(['users'], ['users.id'], ),
    sa.PrimaryKeyConstraint('users', 'communities')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('communityFollows')
    op.drop_table('communities')
    op.drop_table('users')
    # ### end Alembic commands ###
