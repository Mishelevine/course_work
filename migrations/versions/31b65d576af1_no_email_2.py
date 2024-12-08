"""No email 2

Revision ID: 31b65d576af1
Revises: 9873fc8e8c15
Create Date: 2024-12-09 00:35:28.163998

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '31b65d576af1'
down_revision: Union[str, None] = '9873fc8e8c15'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
