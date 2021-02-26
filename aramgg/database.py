from aramgg.models import db


def get_all(model):
    data = model.query.all()
    return data


def add_instance(model, **kwargs):
    instance = model(**kwargs)
    db.session.add(instance)
    commit_changes()


def delete_instance(model, instance_id: int):
    model.query.filter_by(id=instance_id).delete()
    commit_changes()


def edit_instance(model, instance_id: int, **kwargs):
    instance = model.query.filter_by(id=instance_id).all()[0]
    for attr, new_value in kwargs:
        setattr(instance, attr, new_value)
    commit_changes()


def commit_changes():
    db.session.commit()
