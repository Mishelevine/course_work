"""LicenseContract3

Revision ID: a2780daf411c
Revises: 82278013d8f3
Create Date: 2025-01-10 22:08:50.376434

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a2780daf411c'
down_revision: Union[str, None] = '82278013d8f3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('contracts',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('contract_number', sa.String(length=20), nullable=False),
    sa.Column('contract_date', sa.Date(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('licenses',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('license_type', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('licenses')
    op.drop_table('contracts')
    # ### end Alembic commands ###
