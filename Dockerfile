FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PIP_NO_CACHE_DIR=1
WORKDIR /app
COPY jeevan/requirements.txt /app/requirements.txt
RUN pip install --requirement requirements.txt \
    && groupadd --gid 10001 jeevan \
    && useradd --uid 10001 --gid 10001 --no-create-home jeevan
COPY --chown=10001:10001 jeevan/ /app/
COPY deploy/entrypoint.sh /usr/local/bin/jeevan-entrypoint
RUN sed -i 's/\r$//' /usr/local/bin/jeevan-entrypoint \
    && chmod 755 /usr/local/bin/jeevan-entrypoint \
    && mkdir -p /app/media /app/private_media /app/staticfiles /app/logs \
    && chown -R 10001:10001 /app
USER 10001:10001
EXPOSE 8000
ENTRYPOINT ["/usr/local/bin/jeevan-entrypoint"]
CMD ["gunicorn", "jeevan.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "2", "--threads", "2", "--timeout", "60", "--error-logfile", "-"]
