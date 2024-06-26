from flask import Blueprint, jsonify, make_response

test_bp = Blueprint('test', __name__)


@test_bp.route('/test', methods=['GET'])
def test():
    return make_response(jsonify({"msg": "test"})), 200


@test_bp.route('/', methods=['GET'])
def test1():
    return make_response(jsonify({"msg": "test22"})), 200
