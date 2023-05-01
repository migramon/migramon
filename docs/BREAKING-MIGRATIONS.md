

### There is way how you can handle breaking migrations.

Let's assume you currently have a lot migrations that you want to bundle or split.


For example you have project or library with version 1.0.0

1) at current version you create one more migration in project, where you need to init  actual version for your 
second split, so split initialization will not be run again for users of current version.

publish version 1.0.1 with this migration.

2) you can move or bundle migrations to second project. Then set minVersion to 2.0.0 in config for second bundle.

publish version 2.0.0


Result of this operation:
1) old users who tried to upgrade from 1.0.0 to 2.0.0 will be asked 
to downgrade and run migrations from last version of previous mayor version (1.0.1).
2) users who updated from 1.0.1 to 2.0.0 will not have any new migrations, 
because they are on same version already
3) new users will run init and all new available migrations from 2.0.0. New user 
will not be asked to downgrade.

