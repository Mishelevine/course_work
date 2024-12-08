"""Username

Revision ID: a7ad022f1707
Revises: d734c131e30f
Create Date: 2024-12-09 01:06:02.592494

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a7ad022f1707'
down_revision: Union[str, None] = 'd734c131e30f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
