from app.models import Order


class OrderGetService:
    @staticmethod
    def format_order(order):
        return {
            "id": order.id,
            "order_date": order.order_date.strftime('%Y-%m-%d %H:%M'),
            "is_completed": order.is_completed,
            "prepared_by": order.prepared_by.strftime('%Y-%m-%d %H:%M'),
            "phone_number": order.phone_number,
            "cart": order.cart.replace("{", "").replace("}", "").replace(",", ", "),
            "total_amount": order.total_amount
        }

    @staticmethod
    def get_order_by_id(order_id):
        if order_id == "latest":
            latest_order = Order.query.order_by(Order.id.desc()).first()
            if latest_order:
                return OrderGetService.format_order(latest_order), "Заказ найден"
            return None, "Нет заказов"

        try:
            order_id = int(order_id)
            order = Order.query.get(order_id)
            if order:
                return OrderGetService.format_order(order), "Заказ найден"
            return None, "Заказ не найден"
        except ValueError:
            return None, "Неверный формат order_id"

    @staticmethod
    def get_all_orders():
        orders = Order.query.order_by(Order.id.asc()).all()
        formatted_orders = [OrderGetService.format_order(order) for order in orders]
        return formatted_orders

    @staticmethod
    def get_all_orders_in_desc_order():
        orders = Order.query.order_by(Order.id.desc()).all()
        formatted_orders = [OrderGetService.format_order(order) for order in orders]
        return formatted_orders

    @staticmethod
    def get_orders_by_phone_number(phone_number):
        orders = Order.query.filter_by(phone_number=phone_number).all()
        formatted_orders = [OrderGetService.format_order(order) for order in orders]
        return formatted_orders

    @staticmethod
    def get_orders_by_phone_number_in_desc_order(phone_number):
        orders = Order.query.filter_by(phone_number=phone_number).order_by(Order.id.desc()).all()
        formatted_orders = [OrderGetService.format_order(order) for order in orders]
        return formatted_orders

    @staticmethod
    def get_incomplete_orders():
        orders = Order.query.filter_by(is_completed=False).all()
        formatted_orders = [OrderGetService.format_order(order) for order in orders]
        return formatted_orders
