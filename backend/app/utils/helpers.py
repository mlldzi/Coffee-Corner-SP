from flask import blueprints, current_app
from flask_jwt_extended import create_access_token, create_refresh_token
from datetime import timedelta

routes_bp = blueprints.Blueprint('routes', __name__)


@routes_bp.route('/', methods=['GET'])
def show_routes():
    routes = []
    for rule in current_app.url_map.iter_rules():
        methods = ', '.join(sorted(rule.methods))
        route = f"{rule.rule} (Methods: {methods})"
        routes.append(route)
    return "<br>".join(routes)


def generate_tokens(user_id, role):
    access_token = create_access_token(identity={"id": user_id, "role": role}, expires_delta=timedelta(minutes=10))
    refresh_token = create_refresh_token(identity={"id": user_id, "role": role}, expires_delta=timedelta(days=7))
    return access_token, refresh_token
