from pydantic import BaseModel


class Settings(BaseModel):
    authjwt_secret_key: str = "lmq6kO+vD95pk0r8CdvToWrcRtMyn48eFADCXf5EkxU="

