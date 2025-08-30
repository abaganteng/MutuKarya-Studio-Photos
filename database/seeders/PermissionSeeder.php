<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionSeeder extends Seeder
{
    protected function generatePermissions(): array
    {
        $models = [];
        $path = app_path('Models');
        $permissions = ['create', 'update', 'delete', 'read', 'approve'];
        
        foreach(glob($path . '/*.php') as $file) {
            $modelName = strtolower(basename($file, '.php'));
            foreach ($permissions as $permission) {
                $models[] = "{$permission} {$modelName}";
            }
        }

        return $models;
    }
    public function run(): void
    {
        
        collect($this->generatePermissions())
            ->each( fn ($permission) => Permission::create(['name' => $permission]));

        $rolesPermissions = collect([
            'admin' => Permission::pluck('name')->toArray(),
            // 'pengguna' => ['read pengaduan', 'create pengaduan', 'update pengaduan', 'delete pengaduan'],
        ]);

        $rolesPermissions->each(function ($permissions, $role) {
            $roleInstance = Role::create(['name' => $role]);
            $roleInstance->givePermissionTo($permissions);
        });

        User::find(1)->assignRole('admin');


    }
}
