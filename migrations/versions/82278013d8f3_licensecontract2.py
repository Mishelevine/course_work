"""LicenseContract2

Revision ID: 82278013d8f3
Revises: 682343804d2b
Create Date: 2025-01-10 22:07:55.001985

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '82278013d8f3'
down_revision: Union[str, None] = '682343804d2b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
