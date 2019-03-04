# README

# ChatSpace

# DataTable

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|email|string|null: false, unique: true|
|group_id|integer|null: false|

### Association
- has_many :messages
- has_many :groups, through: :members

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: true|
|image|string|null: true|
|day_of_week|string|null: false|
|user_id|integer|null: false|
|group_id|integer|null: false|

### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|
|user_id|integer|null: false|
|message_id|integer|null: true|

### Association
- has_many :users, through: :members
- has_many :messages

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_member|string|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
