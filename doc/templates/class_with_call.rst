..
    The empty line below should not be removed. It is added such that the `rst_prolog`
    is added before the :mod: directive. Otherwise, the rendering will show as a
    paragraph instead of a header.

:use_api_page_toc:

{{objname}}
{{ underline }}===============

.. currentmodule:: {{ module }}

.. autoclass:: {{ objname }}

   {% block methods %}
   .. automethod:: __call__
   {% endblock %}

.. include:: {{module}}.{{objname}}.examples
