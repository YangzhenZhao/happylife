from django.db import models

from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

class MyUserManager(BaseUserManager):
    def create_user(
        self,
        username: str,
        password: str,
        email: str,
        addr: str,
        sex: str,
        hefeng_city_id: str,
        date_of_birth: str,
    ):
        print(f"date_of_birth = {date_of_birth}")
        print(self.model is None)
        user = self.model(
            username=username,
            email=self.normalize_email(email),
            addr=addr,
            sex=sex,
            hefeng_city_id=hefeng_city_id,
            date_of_birth=date_of_birth,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self,
        username: str,
        password: str,
        email: str,
        addr: str,
        sex: str,
        hefeng_city_id: str,
        date_of_birth: str,
    ):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            username, password, email, addr, sex, hefeng_city_id, date_of_birth
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class MyUser(AbstractBaseUser):
    username = models.CharField(
        verbose_name='username',
        max_length=20,
        unique=True,
    )
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    date_of_birth = models.CharField(max_length=16)
    sex = models.CharField(max_length=16)
    addr = models.CharField(max_length=128)
    hefeng_city_id = models.CharField(max_length=128)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = MyUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['date_of_birth', 'sex', 'addr', 'hefeng_city_id', 'email']

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
