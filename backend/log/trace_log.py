def trace_log(logger):
    from functools import wraps

    def wrapper(fn):
        @wraps(fn)
        def inner(*args, **kwargs):
            logger.debug(f"{fn.__qualname__}: entry, args {args}, kwargs {kwargs}")
            out = fn(*args, **kwargs)
            logger.debug(f"{fn.__qualname__}: exit, returned {out}")
            return out

        return inner

    return wrapper
