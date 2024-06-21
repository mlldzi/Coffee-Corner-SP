from datetime import datetime
from app import db
from app.models import Order


class OrderService:
    @staticmethod
    def format_order(order):
        return {
            "id": order.id,
            "order_date": order.order_date.strftime('%Y-%m-%d %H:%M:%S'),
            "is_completed": order.is_completed,
            "prepared_by": order.prepared_by.strftime('%Y-%m-%d %H:%M:%S'),
            "phone_number": order.phone_number,
            "cart": order.cart,
            "total_amount": order.total_amount
        }

    @staticmethod
    def create_new_order(phone_number, cart, prepared_by, total_amount):
        try:
            prepared_by = datetime.strptime(prepared_by, '%Y-%m-%d %H:%M:%S')
        except ValueError:
            return None, "Неверный формат времени"

        new_order = Order(
            phone_number=phone_number,
            cart=cart,
            prepared_by=prepared_by,
            total_amount=total_amount
        )

        db.session.add(new_order)
        db.session.commit()

        return new_order, "Заказ успешно создан"

    @staticmethod
    def get_order_by_id(order_id):
        order = Order.query.get(order_id)
        if order:
            return OrderService.format_order(order)
        return None

    @staticmethod
    def get_all_orders():
        orders = Order.query.all()
        return [OrderService.format_order(order) for order in orders]

    @staticmethod
    def get_orders_by_phone_number(phone_number):
        orders = Order.query.filter_by(phone_number=phone_number).all()
        return [OrderService.format_order(order) for order in orders]

    @staticmethod
    def get_incomplete_orders():
        orders = Order.query.filter_by(is_completed=False).all()
        return [OrderService.format_order(order) for order in orders]

    @staticmethod
    def update_order(order_id, phone_number=None, cart=None, prepared_by=None, total_amount=None, is_completed=None):
        if order_id == "latest":
            order = Order.query.order_by(Order.id.desc()).first()
        else:
            try:
                order_id = int(order_id)
                if order_id > Order.query.order_by(Order.id.desc()).first().id:
                    order = Order.query.order_by(Order.id.desc()).first()
                else:
                    order = Order.query.get(order_id)
            except ValueError:
                return None, "Неверный формат order_id"

            if not order:
                return None, "Заказ не найден"

        if phone_number is not None:
            order.phone_number = phone_number
        if cart is not None:
            order.cart = cart
        if prepared_by is not None:
            try:
                order.prepared_by = datetime.strptime(prepared_by, '%Y-%m-%d %H:%M:%S')
            except ValueError:
                return None, "Неверный формат времени"
        if total_amount is not None:
            order.total_amount = total_amount
        if is_completed is not None:
            order.is_completed = is_completed

        db.session.commit()

        return order, "Заказ успешно обновлен"

    @staticmethod
    def delete_order(order_id):
        order = Order.query.get(order_id)
        if not order:
            return None, "Заказ не найден"

        db.session.delete(order)
        db.session.commit()

        return True, "Заказ успешно удален"
