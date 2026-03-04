(function () {
    'use strict';

    angular.module('inspinia')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$q', '$rootScope'];

    function AuthService($q, $rootScope) {
        // Supabase configuration
        var SUPABASE_URL = 'https://sqamxlhfazulrisiptud.supabase.co';
        var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxYW14bGhmYXp1bHJpc2lwdHVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjczNzU4ODQsImV4cCI6MjA4Mjk1MTg4NH0.UmshkDqIgJQYVMmWVVgmfQm-YacUbRBeSpmYsNG0baE';

        // Initialize Supabase Client
        var supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        var service = {
            login: login,
            register: register,
            logout: logout,
            getSession: getSession,
            getUserProfile: getUserProfile,
            getCurrentUserRole: getCurrentUserRole,
            getCurrentUserSector: getCurrentUserSector
        };

        return service;

        function register(userData) {
            var deferred = $q.defer();

            supabase.auth.signUp({
                email: userData.email,
                password: userData.password
            }).then(function (response) {
                if (response.error) {
                    deferred.reject(response.error);
                } else {
                    // Podemos criar o perfil do usuário ou deixar um trigger no Supabase fazer isso
                    var profileToInsert = {
                        user_id: response.data.user.id,
                        full_name: userData.name,
                        role: 'member'
                    };
                    supabase.from('profiles').insert(profileToInsert).then(function (profileRes) {
                        deferred.resolve(response.data);
                    });
                }
            });

            return deferred.promise;
        }

        function login(credentials) {
            var deferred = $q.defer();

            supabase.auth.signInWithPassword({
                email: credentials.email,
                password: credentials.password
            }).then(function (response) {
                if (response.error) {
                    deferred.reject(response.error);
                } else {
                    // Após o login, vamos buscar o perfil do usuário
                    getUserProfile(response.data.user.id).then(function (profile) {
                        $rootScope.currentUser = profile;
                        deferred.resolve(response.data);
                    }).catch(function (err) {
                        deferred.reject(err);
                    });
                }
            });

            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();

            supabase.auth.signOut().then(function (response) {
                if (response.error) {
                    deferred.reject(response.error);
                } else {
                    $rootScope.currentUser = null;
                    deferred.resolve(response);
                }
            });

            return deferred.promise;
        }

        function getSession() {
            var deferred = $q.defer();

            supabase.auth.getSession().then(function (response) {
                if (response.error) {
                    deferred.reject(response.error);
                } else {
                    deferred.resolve(response.data.session);
                }
            });

            return deferred.promise;
        }

        function getUserProfile(userId) {
            var deferred = $q.defer();

            // Assumindo que a tabela se chama 'profiles' e tem colunas 'user_id', 'role' e 'sector'
            supabase
                .from('profiles')
                .select('*')
                .eq('user_id', userId)
                .single()
                .then(function (response) {
                    if (response.error) {
                        // Se não encontrar o perfil, resolve com um objeto vazio ou os dados mínimos do Auth
                        console.warn('Perfil não encontrado no banco de dados', response.error);
                        deferred.resolve({ user_id: userId, role: 'member' });
                    } else {
                        deferred.resolve(response.data);
                    }
                });

            return deferred.promise;
        }

        function getCurrentUserRole() {
            return $rootScope.currentUser ? $rootScope.currentUser.role : null;
        }

        function getCurrentUserSector() {
            return $rootScope.currentUser ? $rootScope.currentUser.sector : null;
        }
    }
})();
