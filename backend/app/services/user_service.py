from app.models import User


class UserService:
    @staticmethod
    def get_phone_number_by_user_id(user_id):
        user = User.query.filter_by(id=user_id).first()
        if user:
            return user.phone_number
        return None
