from flask import blueprints, current_app, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token
from datetime import timedelta
from flask_jwt_extended import set_access_cookies, set_refresh_cookies

routes_bp = blueprints.Blueprint('routes', __name__)


@routes_bp.route('/', methods=['GET'])
def show_routes():
    routes = []
    for rule in current_app.url_map.iter_rules():
        methods = ', '.join(sorted(rule.methods))
        route = f"{rule.rule} (Methods: {methods})"
        routes.append(route)
    return "<br>".join(routes)


def generate_auth_response(user_id):
    access_token = create_access_token(identity=user_id)
    refresh_token = create_refresh_token(identity=user_id)

    response = jsonify({"success": True, "access_token": access_token})
    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)

    return response


def validate_data(data, required_fields):
    missing = []
    flag = False
    for field in required_fields:
        if field not in data:
            missing.append(field)
            flag = True
    missing = ', '.join(missing)
    if flag:
        return False, f"Поле(-я) '{missing}' отсутствует(-ют)"
    return True, None
