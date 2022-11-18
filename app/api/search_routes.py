from flask import Blueprint, request
from ..forms import SearchForm
from ..models import Community
search_routes = Blueprint('search', __name__, url_prefix='/api/search')

@search_routes.route('/', methods=['POST'])
def search_communities():
    searchForm = SearchForm()
    searchForm['csrf_token'].data = request.cookies['csrf_token']
    if searchForm.validate_on_submit():
        query = searchForm.data['search']
        searchResult = Community.query.filter(Community.name.ilike(f'%{query}%')).all()
        if searchResult:
            return {'communities': [community.to_dict_rel() for community in searchResult]}
        else:
            return {'communities': {}}
    return searchForm.errors
