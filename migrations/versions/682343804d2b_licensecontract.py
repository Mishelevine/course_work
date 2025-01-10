"""LicenseContract

Revision ID: 682343804d2b
Revises: 36a8cdf59e58
Create Date: 2025-01-10 22:06:42.803179

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '682343804d2b'
down_revision: Union[str, None] = '36a8cdf59e58'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
