"""No email

Revision ID: 9873fc8e8c15
Revises: 14078dd6f83b
Create Date: 2024-12-09 00:33:51.809603

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '9873fc8e8c15'
down_revision: Union[str, None] = '14078dd6f83b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
