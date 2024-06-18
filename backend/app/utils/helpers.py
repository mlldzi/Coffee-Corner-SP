from flask import blueprints, current_app

routes_bp = blueprints.Blueprint('routes', __name__)


@routes_bp.route('/', methods=['GET'])
def show_routes():
    routes = []
    for rule in current_app.url_map.iter_rules():
        methods = ', '.join(sorted(rule.methods))
        route = f"{rule.rule} (Methods: {methods})"
        routes.append(route)
    return "<br>".join(routes)
