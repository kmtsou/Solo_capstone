from flask.cli import AppGroup

from .posts import seed_post, undo_post
from .users import seed_users, undo_users
from .communities import seed_community, undo_community

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_community()
    seed_post()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_community()
    undo_post()
    # Add other undo functions here
