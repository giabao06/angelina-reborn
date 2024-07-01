# sample database structure for db.sqlite

```
*edit stuff in here using a sqlite editor or smth idk, might make cmds for editing later
```

## operator info table (for op command)

| id  | name | friendlyname | rarity | hp  | atk  | def | res | dp  | blk | redep_t | aspd  | rec_skill | desc |
| :-: | :--: | :----------: | :----: | :-: | :--: | :-: | :-: | :-: | :-: | :----:  | :--:  | :-------: | :--: |
| int | text | text         | int    | int | int  | int | int | int | int | float   | float | text      | text |  

- all info is taken from op.json
- op command should query based on name
- cache oplist on startup based on rarity into a json? (in case op not found/user request)
- query syntax:
```sql
SELECT * FROM operators WHERE name='(name)'
```

## admin role table (for all admin-related cmds)

| guild_id | roles |
| text     | text  | 

- roles should be a json array (`"11111111...", "111112..."`)
- admin cmds should query admin roles based on guild id where cmd was executed then check
- **make a command to add admin roles**

## gacha banners table

> damn it the old gacha cmd is just switch case lmao

| type | name | up4 | up5 | up6 |

- might implement dates later

## user pity table

| userid | btype | pity |
| :----: | :---: | :--: |
| text   | text  | int  | 

- on execution, query user pity for banner
- initialize all user pity=0 for first roll
- check conditions based on user pity then roll