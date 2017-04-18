package org.andy.work.entity;

// Generated 2015-2-3 10:43:00 by Hibernate Tools 4.0.0

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;

/**
 * Approval created by tianlei
 */
@Entity
@Table(name = "t_manager", catalog = "finance_demo_db")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Manager implements java.io.Serializable {

	/**
	 *
	 */
	@JsonProperty
	private int ID;
	@JsonProperty
	private String Account;
	@JsonProperty
	private String Pwd;
	@JsonProperty
	private Role role;

	public Manager() {
		
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", unique = true, nullable = false)
	@JsonIgnore
	public int getID() {
		return this.ID;
	}

	public void setID(int ID) {
		this.ID = ID;
	}

	@JsonIgnore
	@Column(name = "Account")
	public String getAccount() {
		return this.Account;
	}

	public void setAccount(String Account) {
		this.Account = Account;
	}

	@JsonIgnore
	@Column(name = "Pwd")
	public String getPwd() {
		return this.Pwd;
	}

	public void setPwd(String Pwd) {
		this.Pwd = Pwd;
	}



	@ManyToOne(fetch = FetchType.EAGER)
	@Cascade(value=org.hibernate.annotations.CascadeType.SAVE_UPDATE)
	@JoinColumn(name="Role", nullable = true)
	@JsonIgnore
	public Role getRole() {
		return this.role;
	}

	public void setRole(Role Role) {
		this.role = Role;
	}

}
